import { Button } from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { isProfessionalEmail } from "../../lib/emailValidation";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate email
        if (!email.trim()) {
            setError("Email address is required");
            return;
        }

        if (!isProfessionalEmail(email)) {
            setError("Please use a professional organizational email address (not Gmail, Yahoo, or temporary emails)");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call to send password reset email
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSuccess(`Password reset instructions have been sent to ${email}. 
                       Please check your email and follow the instructions to reset your password.`);
            
            // Clear form
            setEmail("");
            
        } catch (err) {
            setError("Something went wrong. Please try again or contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-4">
                    <div>
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-slate-500 hover:text-brand-green transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Website
                        </Link>
                    </div>
                    <h3 className="text-3xl font-extrabold text-brand-dark">Reset Password</h3>
                    <p className="text-brand-slate-500 font-medium">Enter your email address to receive reset instructions.</p>
                </div>

                {success ? (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-6 w-6 text-green-600" />
                            <h4 className="font-bold text-green-800">Reset Email Sent!</h4>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {success}
                        </p>
                        <div className="mt-6">
                            <Button
                                onClick={() => navigate("/login")}
                                className="w-full h-12"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b-2 border-gray-200 focus:border-green-500 py-3 text-lg font-medium focus:outline-none transition-colors"
                                    placeholder="your-email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4 pt-10">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 text-lg"
                            >
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </Button>
                            <p className="text-center text-sm text-gray-400 font-medium">
                                Remember your password? <Link to="/login" className="text-gray-900 font-bold hover:underline">Sign In</Link>
                            </p>
                        </div>
                    </form>
                )}

                <div className="pt-20 border-t border-gray-200 flex items-center justify-center gap-3 grayscale opacity-30">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">Verified Secure</span>
                </div>
            </div>
        </div>
    );
}