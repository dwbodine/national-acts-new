import { FAQuestionProps } from "@/types/props";
import parse from 'html-react-parser';
import { useState } from "react";

export default function FAQuestion(props: FAQuestionProps) {
    const { question, index } = props;
    const [expanded, setExpanded] = useState(false);

    const expandRow = () => {
        setExpanded(!expanded);
    };

    const answer = question?.answer ? parse(question.answer) : '';

    return (
        <div className="jag-faq-theme6 jag-faq-theme-blue" key={`faq_${index}`} hidden={!question.question}>
            <div className="jag-faq-wrapper">
                <div className="jag-faq-title" aria-expanded="true" onClick={() => expandRow()}>
                    <i className="jag-faq-icon-2 fa float-right fa-plus"></i>
                    {question.question}
                </div>
                <div aria-expanded="true" hidden={!expanded}>
                    <div className="panel-body">
                        {answer}
                    </div>
                </div>
            </div>        
        </div>
    );
}