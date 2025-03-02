import ResetPasswordPageClient from "./clientPage";

export default async function ResetPasswordPage({ params }) {
    const { token } = await params;

    return (
        <ResetPasswordPageClient
            token={token}
        />
    )
}