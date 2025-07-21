import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const StadiumChart = ({ score = 1, maxScore = 100 }) => {
  const width = 400;
  const height = 150;
  const padding = 12;
  const radius = (height - 2 * padding) / 2;
  const dashCount = 120;
  const dashLength = 22;
  const dashWidth = 3;
  const colorActive = '#B6C94B';
  const colorInactive = '#E5E7EB';
  const progress = score / maxScore;

  // SVG path stadium (rounded rectangle) - start dari tengah atas
  const cx = width / 2;
  const left = padding + radius;
  const right = width - padding - radius;
  const top = padding;
  const bottom = height - padding;
  const d = `M ${cx} ${top}
    H ${right}
    A ${radius} ${radius} 0 0 1 ${right} ${bottom}
    H ${left}
    A ${radius} ${radius} 0 0 1 ${left} ${top}
    H ${cx}`;

  const pathRef = useRef(null);
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLength = path.getTotalLength();
    const dashSpace = totalLength / dashCount;
    const dashArr = [];
    for (let i = 0; i < dashCount; i++) {
      const pos = i * dashSpace;
      const pt = path.getPointAtLength(pos);
      // Tangent angle
      const pt2 = path.getPointAtLength((pos + 0.5) % totalLength);
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
      dashArr.push({ x: pt.x, y: pt.y, rot: angle });
    }
    setDashData(dashArr);
  }, [width, height, dashCount, d]);

  const activeDash = Math.round(progress * dashCount);

  return (
    <div className="flex justify-center items-center mt-8 relative " style={{ width }}>
      <svg width={width} height={height}>
        <path d={d} fill="none" stroke="none" ref={pathRef} />
        {dashData.map(({ x, y, rot }, i) => (
          <rect
            key={i}
            x={x - dashWidth / 2}
            y={y - dashLength / 2}
            width={dashWidth}
            height={dashLength}
            fill={i < activeDash ? colorActive : colorInactive}
            rx={0}
            transform={`rotate(${rot} ${x} ${y})`}
          />
        ))}
      </svg>
      {/* Score di tengah chart dengan layout baru */}
      <div className="absolute left-1/2 top-1/2 flex items-center" style={{ transform: 'translate(-50%, -50%)' }}>
        {/* Angka besar kiri */}
        <span className="text-6xl font-bold text-white mr-4">{score}</span>
        {/* Garis vertikal */}
        <div className="h-12 w-px bg-gray-300 mx-2" />
        {/* Kanan: info */}
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500 whitespace-nowrap">{score}/{maxScore} efficiency</span>
          <span className="text-2xl font-bold text-white">Score</span>
        </div>
      </div>
    </div>
  );
};

// Dummy data aspek penilaian (performa sangat bagus)
const dummyScoreData = {
  avgPrepTime: 4,      // ≤5 menit dapat 30 poin (maksimal)
  avgOrderGap: 8,      // ≤10 menit dapat 20 poin (maksimal)
  aov: 36000,          // ≥35.000 dapat 20 poin (maksimal)
  aovTarget: 35000,    // Target AOV
  bestVsLowSellerGap: 10, // ≤30 dapat 10 poin (maksimal)
};

// Fungsi penilaian score
function calculateScore(data) {
  let score = 0;
  // Waktu penyajian (max 30)
  if (data.avgPrepTime <= 5) score += 30;
  else if (data.avgPrepTime <= 7) score += 20;
  else score += 10;

  // Jeda order (max 20)
  if (data.avgOrderGap <= 10) score += 20;
  else if (data.avgOrderGap <= 15) score += 15;
  else score += 10;

  // AOV (max 20)
  score += Math.min((data.aov / data.aovTarget) * 20, 20);

  // Gap best vs low seller (max 10)
  if (data.bestVsLowSellerGap <= 30) score += 10;
  else if (data.bestVsLowSellerGap <= 60) score += 7;
  else score += 4;

  // Skala ke 100
  return Math.round((score / 80) * 100);
}

// Fungsi untuk menghitung skor per aspek
function getAspectScores(data) {
  // Kembalikan array objek: { label, value, score, satuan }
  return [
    {
      key: 'avgPrepTime',
      label: 'Rata-rata Waktu Penyajian',
      value: data.avgPrepTime,
      satuan: 'menit',
      score: data.avgPrepTime <= 5 ? 30 : data.avgPrepTime <= 7 ? 20 : 10,
      max: 30,
    },
    {
      key: 'avgOrderGap',
      label: 'Rata-rata Jeda Order',
      value: data.avgOrderGap,
      satuan: 'menit',
      score: data.avgOrderGap <= 10 ? 20 : data.avgOrderGap <= 15 ? 15 : 10,
      max: 20,
    },
    {
      key: 'aov',
      label: 'Average Order Value',
      value: data.aov,
      satuan: 'rupiah',
      score: Math.min((data.aov / data.aovTarget) * 20, 20),
      max: 20,
    },
    {
      key: 'bestVsLowSellerGap',
      label: 'Best vs Low Seller Gap',
      value: data.bestVsLowSellerGap,
      satuan: '',
      score: data.bestVsLowSellerGap <= 30 ? 10 : data.bestVsLowSellerGap <= 60 ? 7 : 4,
      max: 10,
    },
  ];
}

const warningMessages = {
  avgPrepTime: {
    main: (value) => <>Rata-rata waktu penyajian<span className="font-bold">{value} menit</span></>,
    detail: 'Waktu penyajian lebih lama dari standar. Segera lakukan pengecekan operasional',
  },
  avgOrderGap: {
    main: (value) => <>Rata-rata jeda order <span className="font-bold">{value} menit</span></>,
    detail: 'Jeda antar order terlalu lama. Cek alur pemesanan dan pelayanan.',
  },
  aov: {
    main: (value) => <>Average order value <span className="font-bold">Rp{(value/1000).toFixed(0)}rb</span></>,
    detail: 'Nilai transaksi rata-rata rendah. Evaluasi strategi upselling/cross-selling.',
  },
  bestVsLowSellerGap: {
    main: (value) => <>Gap best vs low seller <span className="font-bold">{value}</span></>,
    detail: 'Perbedaan penjualan produk terlalu besar. Cek promosi produk yang kurang laku.',
  },
};

const ScoreDashboard = () => {
  const maxScore = 100;
  const score = calculateScore(dummyScoreData);
  // Dapatkan skor per aspek dan urutkan dari terendah (paling urgent)
  const aspectScores = getAspectScores(dummyScoreData).sort((a, b) => a.score - b.score);
  // Hanya aspek yang skornya belum maksimal
  const urgentAspects = aspectScores.filter(a => Math.round(a.score) < a.max).slice(0, 2);
  // Cek apakah semua aspek sudah skor maksimal
  const allGood = aspectScores.every(a => Math.round(a.score) === a.max);
  // State untuk card yang sedang aktif (di-tap)
  const [activeCard, setActiveCard] = useState(null);
  return (
    <div className="border border-1 rounded-3xl shadow-md p-3" style={{ borderColor: 'var(--color-card-border)', background: 'var(--color-black)' }}>
      <div className="p-2 font-bold text-lg">Efficiency Score</div>
      <hr className="border-[var(--color-dark)] mt-2 w-117 mx-auto" />
      <div className="flex justify-center">
        <StadiumChart score={score} maxScore={maxScore} />
      </div>
      {/* Card urgensi atau ucapan selamat */}
      <div className="mt-8 flex flex-col px-12 gap-4">
        {allGood ? (
          <div className="bg-[var(--color-black)] border border-[var(--color-gray)] rounded-xl p-4 flex items-center transition-colors duration-200">
            <div className="pl-3 flex items-center w-full">
              <div>
                <div className="text-lg font-bold text-white">Great Job!</div>
                <div className="text-sm text-[var(--color-gray)]">Your performance is on track!</div>
              </div>
              <span className="text-2xl ml-auto font-bold text-yellow-400">!</span>
            </div>
          </div>
        ) : (
          urgentAspects.map((aspect) => {
            const isActive = activeCard === aspect.key;
            return (
              <div
                key={aspect.key}
                className={`border border-[var(--color-dark)] rounded-xl p-2 flex flex-col items-start transition-colors duration-200 cursor-pointer ${isActive ? 'bg-gray-100' : 'bg-[var(--black)]'}`}
                onClick={() => setActiveCard(isActive ? null : aspect.key)}
              >
                <div className="flex items-center w-full pl-3 relative">
                  <span className={`text-base font-medium flex items-center gap-2 ${isActive ? 'text-[var(--color-dark)]' : 'text-white'}`}> 
                    {warningMessages[aspect.key]?.main(aspect.value)}
                    <span className={`text-xl font-bold text-red-500 ${isActive ? 'text-[var(--color-dark)]' : 'text-red-500'}`}>!</span>
                  </span>
                  {!isActive && (
                    <ChevronDown className={`w-5 h-5 ml-auto pr-2 transition-all duration-300 ${isActive ? 'text-[var(--color-dark)]' : 'text-white'}`} />
                  )}
                  {isActive && (
                    <ChevronDown
                      className={`w-5 h-5 pr-2 transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-7 z-10 ${isActive ? 'text-[var(--color-dark)]' : 'text-white'}`}
                    />
                  )}
                </div>
                {isActive && (
                  <div className="text-xs mt-1 transition-opacity duration-200 text-[var(--color-dark)] pl-3 pr-10">
                    {warningMessages[aspect.key]?.detail}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ScoreDashboard;