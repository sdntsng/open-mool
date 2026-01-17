'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';
import { FileUploader } from '@/components/upload/FileUploader';
import { MetadataForm, Metadata } from '@/components/upload/MetadataForm';

// Constants
// In production, use env var. For dev monorepo, 8787 is standard for Workers.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [uploadKey, setUploadKey] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const [metadata, setMetadata] = useState<Metadata>({
        title: '',
        description: '',
        language: '',
        location: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionComplete, setSubmissionComplete] = useState(false);

    // Handle File Selection & Auto-Upload
    useEffect(() => {
        if (file && status === 'idle') {
            startUpload(file);
        }
    }, [file]);

    const startUpload = async (fileToUpload: File) => {
        setStatus('uploading');
        setProgress(0);
        setError('');
        setUploadKey(null);

        try {
            // 1. Get Presigned URL
            const { data: presigned } = await axios.post(`${API_URL}/upload/presigned`, {
                filename: fileToUpload.name,
                contentType: fileToUpload.type
            });

            // 2. Upload to R2
            await axios.put(presigned.url, fileToUpload, {
                headers: {
                    'Content-Type': fileToUpload.type
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                }
            });

            // 3. Success
            setUploadKey(presigned.key);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please try again.');
            setStatus('error');
        }
    };

    const handleSubmit = async () => {
        if (!uploadKey || !metadata.title) return;

        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/upload/complete`, {
                key: uploadKey,
                ...metadata
            });
            setSubmissionComplete(true);
        } catch (err) {
            console.error(err);
            alert('Failed to save metadata.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submissionComplete) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100 dark:border-zinc-800"
                >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">Upload Complete</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            "{metadata.title}" has been successfully archived.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                        Upload Another
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif mb-3 tracking-tight">Media Ingest</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Archive audio and video for the Open Mool repository.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Upload Area */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-slate-400" /> Source File
                            </h3>
                            <FileUploader
                                file={file}
                                setFile={setFile}
                                progress={progress}
                                status={status}
                                error={error}
                            />
                        </div>

                        {/* Visual Guide or Info could go here */}
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/20 text-sm text-blue-800 dark:text-blue-300">
                            <p className="font-medium mb-1">Upload Tip:</p>
                            <p className="opacity-90">
                                Uploads are processed directly to edge storage. Large files (up to 500MB) are supported.
                                Please ensure high-quality audio/video.
                            </p>
                        </div>
                    </div>

                    {/* Right: Metadata Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                            <h3 className="text-xl font-serif mb-6">Metadata</h3>

                            <MetadataForm
                                data={metadata}
                                onChange={setMetadata}
                                disabled={isSubmitting}
                            />

                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!file || status !== 'success' || !metadata.title || isSubmitting}
                                    className={cn(
                                        "px-8 py-3 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2",
                                        (!file || status !== 'success' || !metadata.title || isSubmitting)
                                            ? "bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>Saving...</>
                                    ) : status === 'uploading' ? (
                                        <>Wait for Upload...</>
                                    ) : status === 'success' ? (
                                        <>Submit Entry</>
                                    ) : (
                                        <>Upload File First</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
