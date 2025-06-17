import { login } from '@/app/lib/data/user.js';

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const user = await login(username, password);
        
        if (user) {
            const token = `mock-token-${Math.random().toString(36).substring(2, 15)}`;
            
            return Response.json({ 
                message: 'Login successful', 
                user,
                token 
            }, { status: 200 });
        } else {
            return Response.json({ 
                message: 'Invalid username or password' 
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return Response.json({ 
            message: 'Internal server error' 
        }, { status: 500 });
    }
}