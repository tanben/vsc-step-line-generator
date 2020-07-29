import * as vscode from 'vscode';
import incrementer from './incrementer';

export function activate(context: vscode.ExtensionContext) {


	const findIncrementStep = vscode.commands.registerCommand('extension.step-line-generator', () => {
		if (vscode.window.activeTextEditor !== undefined){
			const textEditor = vscode.window.activeTextEditor;
			incrementer(textEditor);
		}
	});

	context.subscriptions.push( findIncrementStep);

}

export function deactivate() {}
