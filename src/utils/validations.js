export const validateData = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return "Invalid email format";
    if(password.length < 6) return "Password must be at least 6 characters";
    return null;
}