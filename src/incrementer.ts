import * as vscode from 'vscode';


const LINE_NUM_REGEX_PATTERN = new RegExp(/LINE-{(\w*)}/, 'g');
const STEP_REGEX_PATTERN = new RegExp(/STEP-{(\w*)}/, 'g');

export default (textEditor: vscode.TextEditor) => {

    const docText = textEditor.document.getText();
    if (!docText.match(LINE_NUM_REGEX_PATTERN) && !docText.match(STEP_REGEX_PATTERN) ){
        return;
    }
    const lines:number= textEditor.document.lineCount;

    let textBuffer: string= '';
    const lineBreak  = (textEditor.document.eol === vscode.EndOfLine.CRLF)? '\r\n': '\r';


    for (let lineNum:number=0, stepCounter:number=0; lineNum< lines; lineNum++){
        const textLine:vscode.TextLine = textEditor.document.lineAt(lineNum);

        if (textLine.text.match(STEP_REGEX_PATTERN)){
            stepCounter++;
        }

        const updatedLineCount= `LINE-{${lineNum+1}}`;
        const updatedStepCount= `STEP-{${stepCounter}}`;
        const replaced = textLine.text.replace(LINE_NUM_REGEX_PATTERN, updatedLineCount).replace(STEP_REGEX_PATTERN, updatedStepCount);

        textBuffer= textBuffer.concat( `${replaced}${lineBreak}` );
    }

    const lastLineNum = textEditor.document.lineCount - 1;
    const lastTextLine:vscode.TextLine = textEditor.document.lineAt(lastLineNum);
    const lastCharPos = lastTextLine.range.end.character;

    const textRange = new vscode.Range(0,0,  lastLineNum,  lastCharPos);

    textEditor.edit(editBuilder => {
        editBuilder.replace(textRange, textBuffer);
    });
};
