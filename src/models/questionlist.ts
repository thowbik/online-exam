export class multipleQuestions {
    choice:  options[];
    qset_id: string;
    quest: question[];
}
export interface question {
    q_id :string;
    q_img :string;
    q_text :string;
    seq_no:string;
    subject:string;
  }
  export interface options {
    choice_correct_yn: number;
    choice_id: string;
    choice_img: string;
    choice_text: string;
    q_id: string;
  }
  export interface offLineData {
    serial_no: string;
    session_id: string;
    seq_no: string;
    q_id: string;
    choice_id: string;
    duration: string;
  }
  export interface answerArray {
    q_id: string;
    choice_id: string;
  }
