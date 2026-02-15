import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Card, CardContent, Separator } from './ui-lib';
import { useStore } from '../store';
import { supabase } from '../src/lib/supabase';

interface AccountSettingsProps {
    onUiClose: () => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ onUiClose }) => {
    const { user, isPro, setUser } = useStore();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select(`full_name, website, avatar_url, is_pro`)
                .eq('id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }

            if (data) {
                setFullName(data.full_name);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                // Sync Pro status if needed, though usually handled by webhook -> store sync
            }
        } catch (error: any) {
            console.error('Error loading user data!', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase.from('profiles').upsert({
                id: user?.id,
                full_name: fullName,
                website,
                avatar_url: avatarUrl,
                updated_at: new Date(),
            });

            if (error) throw error;
            alert('Profile updated!');
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
                <p className="text-muted-foreground">Manage your profile and subscription.</p>
            </div>
            <Separator />

            <div className="grid gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={updateProfile} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user?.email} disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-4">Subscription</h3>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">Current Plan</p>
                                <p className="text-sm text-muted-foreground">
                                    {isPro ? 'Pro Plan' : 'Free Plan'}
                                </p>
                            </div>
                            {isPro ? (
                                <Button variant="outline">Manage Subscription</Button>
                            ) : (
                                <Button onClick={onUiClose}>Upgrade to Pro</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
