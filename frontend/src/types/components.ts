export interface IconProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
export interface TaskType {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
}