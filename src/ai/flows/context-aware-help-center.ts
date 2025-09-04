'use server';
/**
 * @fileOverview Generates a context-aware Help Center link based on the user's locale.
 *
 * - getContextAwareHelpCenterLink - A function that returns a relevant Help Center link.
 * - ContextAwareHelpCenterInput - The input type for the getContextAwareHelpCenterLink function.
 * - ContextAwareHelpCenterOutput - The return type for the getContextAwareHelpCenterLink function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareHelpCenterInputSchema = z.object({
  locale: z
    .string()
    .describe('The user’s locale, e.g., en-US, de-DE, fr-CA.'),
});
export type ContextAwareHelpCenterInput = z.infer<
  typeof ContextAwareHelpCenterInputSchema
>;

const ContextAwareHelpCenterOutputSchema = z.object({
  helpCenterLink: z
    .string()
    .url()
    .describe(
      'A URL pointing to a help center page tailored to the user’s locale and relevant regional policies.'
    ),
});
export type ContextAwareHelpCenterOutput = z.infer<
  typeof ContextAwareHelpCenterOutputSchema
>;

export async function getContextAwareHelpCenterLink(
  input: ContextAwareHelpCenterInput
): Promise<ContextAwareHelpCenterOutput> {
  return contextAwareHelpCenterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextAwareHelpCenterPrompt',
  input: {schema: ContextAwareHelpCenterInputSchema},
  output: {schema: ContextAwareHelpCenterOutputSchema},
  prompt: `Given the user's locale, provide a Help Center link that is relevant to the user and their region.

Locale: {{{locale}}}

If the locale is en-US, the help center link is https://example.com/en-us/help.
If the locale is de-DE, the help center link is https://example.com/de-de/help.
If the locale is fr-CA, the help center link is https://example.com/fr-ca/help.
If the locale is en-GB, the help center link is https://example.com/en-gb/help.

Otherwise, if the locale is not listed, provide a link to the generic help center: https://example.com/help.
`,
});

const contextAwareHelpCenterFlow = ai.defineFlow(
  {
    name: 'contextAwareHelpCenterFlow',
    inputSchema: ContextAwareHelpCenterInputSchema,
    outputSchema: ContextAwareHelpCenterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
