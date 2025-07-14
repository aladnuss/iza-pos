import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PALETTE_COLORS = [
  '#606060', '#808080', '#A0A0A0', '#C0C0C0'
];

const Profile: React.FC = () => {
  const [users, setUsers] = useState<{ name: string; color: string; email: string }[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recent = JSON.parse(localStorage.getItem("recentUsers") || "[]").slice(0, 2);
      setUsers(recent);
      setCurrentUserEmail(localStorage.getItem("currentUserEmail") || "");
    }
  }, []);

  const currentUser = users.find(u => u.email === currentUserEmail);
  const otherUsers = users.filter(u => u.email !== currentUserEmail);

  console.log("DEBUG currentUser:", currentUser);

  return (
    <div className="flex flex-col gap-2">
      {currentUser && currentUser.name && (
        <div
          className="flex items-center gap-2 h-10 max-w-fit px-2 py-1 rounded-full cursor-pointer border border-[var(--color-gray)]"
          style={{ background: "var(--color-dark)" }}
          onClick={() => router.push("/user/profile")}
        >
          <div
            className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold"
            style={{ background: PALETTE_COLORS[0], color: "var(--color-black)" }}
          >
            {currentUser.name[0]}
          </div>
          <span className="text-sm font-medium text-[var(--color-white)] pr-1">
            {currentUser.name}
          </span>
        </div>
      )}

      {/* other users */}
      {otherUsers.map((user, idx) => (
        user && user.name ? (
          <div
            key={user.email}
            className="flex items-center gap-2 h-10 max-w-fit px-2 py-1 rounded-full border border-[var(--color-gray)]"
            style={{ background: "var(--color-dark)" }}
          >
            <div
              className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold"
              style={{ background: PALETTE_COLORS[(idx+1) % PALETTE_COLORS.length], color: "var(--color-black)" }}
            >
              {user.name[0]}
            </div>
            <span className="text-sm font-medium text-[var(--color-white)] pr-1">
              {user.name}
            </span>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default Profile;