export class RaketResponseDto {
  raketId: number;
  title: string;
  description: string;
  status: string;
  budget: number;
  dateCreated: Date;
  completedAt: Date | null;
  pictures:{
    imageUrl: Text;
  };
  user: {
    uid: number;
    email: string;
    name: string;
  };
}