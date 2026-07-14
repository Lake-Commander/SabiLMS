import { createClient } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SimulatorClient from './SimulatorClient';

export default async function SimulatorPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Fetch previous run logs safely
    const { data: history } = await supabase
        .from('simulation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return (
        <SimulatorClient 
            user={user} 
            initialHistory={history || []} 
        />
    );
}