'use server';

/**
 * @fileOverview Implements the Easter Egg Terminal flow, providing a hidden terminal interface
 * accessible via a specific key combination (Ctrl + ~).
 *
 * - easterEggTerminal - The main function to process terminal commands.
 * - TerminalInput - The input type for the easterEggTerminal function.
 * - TerminalOutput - The return type for the easterEggTerminal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TerminalInputSchema = z.object({
  command: z
    .string()
    .describe('The command entered by the user in the terminal.'),
});
export type TerminalInput = z.infer<typeof TerminalInputSchema>;

const TerminalOutputSchema = z.object({
  response: z
    .string()
    .describe('The response from the terminal based on the command.'),
});
export type TerminalOutput = z.infer<typeof TerminalOutputSchema>;

export async function easterEggTerminal(input: TerminalInput): Promise<TerminalOutput> {
  return easterEggTerminalFlow(input);
}

const getProfileLevel = ai.defineTool({
  name: 'getProfileLevel',
  description: 'Returns the user profile level.',
  inputSchema: z.object({}),
  outputSchema: z.number().describe('The current profile level of the user.'),
}, async () => {
  // Mock implementation for profile level
  return 5;
});

const getXPProgress = ai.defineTool({
  name: 'getXPProgress',
  description: 'Returns the user XP progress.',
  inputSchema: z.object({}),
  outputSchema: z.number().describe('The current XP progress of the user.'),
}, async () => {
  // Mock implementation for XP progress
  return 75;
});

const easterEggTerminalPrompt = ai.definePrompt({
  name: 'easterEggTerminalPrompt',
  input: {schema: TerminalInputSchema},
  output: {schema: TerminalOutputSchema},
  tools: [getProfileLevel, getXPProgress],
  prompt: `You are a helpful terminal assistant. Respond to the following commands:

- help: List available commands.
- about: Provide a short bio, skills, and interests.
- projects: List showcased projects.
- skills: Display skills dashboard.
- profile: Show profile level and XP progress using the provided tools.

Handle unknown commands gracefully. If user asks to show profile or XP progress, use the appropriate tools. Otherwise, respond to the user without tool use.

Command: {{{command}}}
`,
});

const easterEggTerminalFlow = ai.defineFlow(
  {
    name: 'easterEggTerminalFlow',
    inputSchema: TerminalInputSchema,
    outputSchema: TerminalOutputSchema,
  },
  async input => {
    const {output} = await easterEggTerminalPrompt(input);
    return output!;
  }
);
