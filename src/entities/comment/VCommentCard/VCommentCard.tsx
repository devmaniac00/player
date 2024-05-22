export interface Props {
  author: string;
  content: string;
}

export const VCommentCard = ({ author, content }: Props) => {
    return (
        <div className="max-w-lg">
            <p className="text-sm text-gray-600 font-medium">{author}</p>
            <p>{content}</p>
        </div>
    )
};
