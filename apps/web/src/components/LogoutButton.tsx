"use client";

export default function LogoutButton() {
    return (
        <a
            href="/auth/logout"
            className="button logout"
        >
            Log Out
        </a>
    );
}
