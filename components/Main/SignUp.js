"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Store, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import TermsOfServiceDialog from "./TermsOf";

export default function SignUp() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        restaurantName: '',
        phone: '',
        languages: {
            english: true,
            hebrew: true
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errPass, setErrPass] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errRestaurantName, setErrRestaurantName] = useState('');
    const [errLanguages, setErrLanguages] = useState('');
    const [errPhone, setErrPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emails, setEmails] = useState();
    const [userNames, setUserNames] = useState();
    const [fetching, setFetching] = useState(true);
    const [errTerms, setErrTerms] = useState('')
    const [terms, setTerms] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/signUpData');
                const json = await response.json();
                const emails = json.users.map(user => user.email);
                const usernames = json.users.map(user => user.username);
                setEmails(emails);
                setUserNames(usernames);
                setFetching(false);


            } catch (err) {
                setErrLanguages('Something went wrong, please try again');
            }
        };

        fetchData();
    }, []);

    const router = useRouter();

    const handleBlur = () => {

        if (userNames.includes(formData.username)) {
            setErrUsername('Username already exists');
        }
        if (emails.includes(formData.email)) {
            setErrEmail('Email already exists');
        }
        if (formData.username.length < 3 && formData.username.length !== 0) {
            setErrUsername('Username must be at least 3 characters');
        }
        if (formData.username.length > 20 && formData.username.length !== 0) {
            setErrUsername('Username must be shorter than 20 characters');
        }
        if (formData.username && formData.username.includes(' ')) {
            setErrUsername('Username cant have spaces');
        }
        if (formData.password.length < 8 && formData.password.length !== 0) {
            setErrPass('Password must be at least 8 characters');
        }
        if (formData.password.length > 30 && formData.password.length !== 0) {
            setErrPass('Password must be shorter than 30 characters');
        }
        if ((!formData.email.includes('@') || !formData.email.includes('.') || formData.email.length > 50) && formData.email !== "") {
            setErrEmail('Invalid email');
        }
        if (formData.restaurantName === "" && formData.restaurantName.length !== 0) {
            setErrRestaurantName('Please enter restaurant name');
        }
        if (formData.restaurantName.length > 100 && formData.restaurantName.length !== 0) {
            setErrRestaurantName('Restaurant name must be shorter than 100 characters');
        }
        if (((formData.phone.length > 15 && formData.phone !== "") || (formData.phone.length < 8 && formData.phone !== "")) && formData.phone !== "") {
            setErrPhone('Invalid phone number');
        }
        if (!formData.languages.english && !formData.languages.hebrew) {
            setErrLanguages('Select at least one language');
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrPass('');
        setErrEmail('');
        setErrUsername('');
        setErrRestaurantName('');
        setErrLanguages('');
        setErrPhone('');
        setErrTerms('')

        if (!/^[a-zA-Z]+$/.test(formData.username)) {
            setErrUsername('Username must be in English');
            setIsLoading(false);
            return;
        }
        if (userNames.includes(formData.username)) {
            setErrUsername('Username already exists');
            setIsLoading(false);
            return;
        }
        
        if (emails.includes(formData.email)) {
            setErrEmail('Email already exists');
            setIsLoading(false);
            return;
        }
        if (formData.username.length < 3) {
            setErrUsername('Username must be at least 3 characters');
            setIsLoading(false);
            return;
        }
        if (formData.username.length > 20) {
            setErrUsername('Username must be shorter than 20 characters');
            setIsLoading(false);
            return;
        }
        if (formData.password.length < 8) {
            setErrPass('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }
        if (formData.password.length > 30) {
            setErrPass('Password must be shorter than 30 characters');
            setIsLoading(false);
            return;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.') || formData.email.length > 50) {
            setErrEmail('Invalid email');
            setIsLoading(false);
            return;
        }
        if (formData.restaurantName === "") {
            setErrRestaurantName('Please enter restaurant name');
            setIsLoading(false);
            return;
        }
        if (formData.restaurantName.length > 100) {
            setErrRestaurantName('Restaurant name must be shorter than 100 characters');
            setIsLoading(false);
            return;
        }
        if ((formData.phone.length > 15 && formData.phone !== "") || (formData.phone.length < 8 && formData.phone !== "")) {
            setErrPhone('Invalid phone number');
            setIsLoading(false);
            return;
        }
        if (!formData.languages.english && !formData.languages.hebrew) {
            setErrLanguages('Select at least one language');
            setIsLoading(false);
            return;
        }
        // if (!terms) {
        //     setIsLoading(false);
        //     setErrTerms('Pleas agree to the terms of service');
        //     return;
        // }
        if (fetching) {
            setIsLoading(false);
            setErrLanguages('Something went wrong, please try again');
            return;
        }

        try {
            const response = await fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                }),
            });

            await response.json();

            if (response.ok) {
                router.push('/user/welcomePage');
            }
            else {
                setErrLanguages('Something went wrong, please try again');
            }


        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setErrPass('');
        setErrEmail('');
        setErrUsername('');
        setErrRestaurantName('');
        setErrLanguages('');
        setErrPhone('');
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLanguageChange = (language) => {
        setFormData(prevData => ({
            ...prevData,
            languages: {
                ...prevData.languages,
                [language]: !prevData.languages[language]
            }
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary dark:bg-primary-dark">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-full overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">
                            Username
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                onClick={() => setErrUsername('')}
                                onBlur={handleBlur}
                                className="pl-10"
                                placeholder="Enter your username"
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errUsername}
                        </span>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                onClick={() => setErrPass('')}
                                onBlur={handleBlur}
                                className="pr-10"
                                placeholder="Create a password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                )}
                            </Button>
                        </div>
                        <span className="text-red-500 text-sm">
                            {errPass}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onClick={() => setErrEmail('')}
                                onBlur={handleBlur}
                                className="pl-10"
                                placeholder="Enter your email"
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errEmail}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="restaurantName" className="text-sm font-medium">
                            Restaurant Name
                        </Label>
                        <div className="relative">
                            <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                id="restaurantName"
                                name="restaurantName"
                                type="text"
                                value={formData.restaurantName}
                                onChange={handleChange}
                                onClick={() => setErrRestaurantName('')}
                                onBlur={handleBlur}
                                className="pl-10"
                                placeholder="Enter restaurant name"
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errRestaurantName}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                            Phone Number (optional)
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                onClick={() => setErrPhone('')}
                                onBlur={handleBlur}
                                className="pl-10"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errPhone}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Languages</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                                <Checkbox
                                    id="english"
                                    checked={formData.languages.english}
                                    onCheckedChange={() => handleLanguageChange('english')}
                                    onClick={() => setErrLanguages('')}
                                    onBlur={handleBlur}
                                />
                                <Label htmlFor="english" className="cursor-pointer">English</Label>
                            </div>
                            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                                <Checkbox
                                    id="hebrew"
                                    checked={formData.languages.hebrew}
                                    onCheckedChange={() => handleLanguageChange('hebrew')}
                                    onClick={() => setErrLanguages('')}
                                    onBlur={handleBlur}
                                />
                                <Label htmlFor="hebrew" className="cursor-pointer">Hebrew</Label>
                            </div>
                        </div>
                        <span className="text-red-500 text-sm">
                            {errLanguages}
                        </span>
                    </div>

                    <div className="">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                                <Label htmlFor="english" className="cursor-pointer">By checking here I accept the {<TermsOfServiceDialog />}</Label>
                                <Checkbox
                                    id="terms"
                                    onCheckedChange={(isChecked) => setTerms(isChecked)}
                                    onClick={() => setErrTerms('')}
                                    onBlur={handleBlur}
                                />

                            </div>
                        </div>
                        <span className="text-red-500 text-sm">
                            {errTerms}
                        </span>
                    </div>

                    <Button
                        type="submit"
                        className={`w-full bg-primary dark:bg-primary-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 text-white font-medium py-2.5 ${isLoading ? 'cursor-not-allowed bg-primary-light hover:bg-primary-light dark:bg-primary-light dark:hover:bg-primary-light' : ''}`}
                    >
                        Create Account
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

