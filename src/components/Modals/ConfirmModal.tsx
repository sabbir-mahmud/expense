"use client";

import { ShieldAlert, XCircle } from "lucide-react";
import BaseModal from "./BaseModal";

interface ConfirmModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    message: React.ReactNode;
    isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    onCancel,
    onConfirm,
    message,
    isLoading = false,
}) => {
    if (!open) return null;

    return (
        <BaseModal isOpen={open} onClose={onCancel}>
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md w-full md:w-[680px]">
                <h2 className="text-lg font-semibold mb-3 text-gray-900">
                    Confirmation
                </h2>

                <div className="text-gray-700">{message}</div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 hover:cursor-pointer"
                    >
                        <XCircle className="w-4 h-4" />
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 hover:cursor-pointer"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <ShieldAlert className="w-4 h-4" />
                                Confirm
                            </>
                        )}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default ConfirmModal;
