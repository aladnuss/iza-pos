import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data user' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }
    // Bandingkan password dengan hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }
    // Hilangkan password sebelum mengirim response
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email sudah terdaftar' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Simpan user baru
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    // Hilangkan password sebelum mengirim response
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat register' });
  }
}
