-- CreateTable
CREATE TABLE "RecentLogin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentLogin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentLogin" ADD CONSTRAINT "RecentLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
