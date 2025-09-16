export interface CameraAngle {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  title: string;
  description: string;
  src: string | null;
  status: 'pending' | 'generating' | 'success' | 'error';
}