import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from './ui-lib';
import { useStore } from '../store';
import { supabase } from '../src/lib/supabase';
import { MockupState } from '../types';

interface SavedPostsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (state: Partial<MockupState>) => void;
}

interface SavedPost {
    id: string;
    title: string;
    content_json: any;
    created_at: string;
}

export const SavedPostsModal: React.FC<SavedPostsModalProps> = ({ isOpen, onClose, onLoad }) => {
    const { user } = useStore();
    const [posts, setPosts] = useState<SavedPost[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            fetchPosts();
        }
    }, [isOpen, user]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('saved_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const { error } = await supabase.from('saved_posts').delete().eq('id', id);
            if (error) throw error;
            setPosts(posts.filter(p => p.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleLoad = (post: SavedPost) => {
        onLoad(post.content_json);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl h-[80vh] flex flex-col rounded-lg border bg-background shadow-lg animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">My Saved Posts</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center p-8">Loading...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-muted-foreground p-8">No saved posts found. Save your first design!</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {posts.map((post) => (
                                <Card
                                    key={post.id}
                                    className="cursor-pointer hover:border-primary transition-colors group relative"
                                    onClick={() => handleLoad(post)}
                                >
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold truncate">{post.title || 'Untitled Post'}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => handleDelete(post.id, e)}
                                        >
                                            X
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
