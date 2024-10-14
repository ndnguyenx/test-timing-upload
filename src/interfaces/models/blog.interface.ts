import { ETimer } from "@/enums/common.enum";
import { ITimer } from ".";

export interface IBlog{
  title: string;
  content: string;
  thumb: File;
  timer: ITimer;
  creator: any;
  schedule: ETimer;
}