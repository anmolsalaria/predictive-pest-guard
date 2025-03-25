import type { Metadata } from "next"
import ProfilePage from "@/components/ProfilePage"

export const metadata: Metadata = {
  title: "Profile | Predictive PestGuard",
  description: "Manage your profile settings and preferences.",
}

export default function Profile() {
  return <ProfilePage />
}

