export interface IMessage {
  id: string;
  text: string | null;
  image: string | null;
  imageFilename: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  channelId: string;
}