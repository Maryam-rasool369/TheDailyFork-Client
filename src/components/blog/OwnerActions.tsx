import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OwnerActionsProps {
    blogId: number;
    onDelete?: () => void;
}

const OwnerActions = ({ blogId, onDelete }: OwnerActionsProps) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/blog/${blogId}/edit`);
    };

    return (
        <div className="flex justify-end items-center gap-3 ">
            <button
                onClick={handleEdit}
                className="flex items-center gap-2 rounded-full bg-muted px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-moss hover:shadow-md"
            >
                <Pencil size={17} />
            </button>

            <button
                onClick={onDelete}
                className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
            >
                <Trash2 size={17} />
            </button>
        </div>
    );
};

export default OwnerActions;