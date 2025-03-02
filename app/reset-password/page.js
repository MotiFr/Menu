import RequestResetForm from "@/components/Main/RequestResetForm";

export default function RequestPasswordResetPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>
        <RequestResetForm />
      </div>
    </div>
  );
}