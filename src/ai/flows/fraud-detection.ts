'use server';

/**
 * @fileOverview An AI agent to predict bus pass application fraud.
 *
 * - predictFraud - A function that predicts the likelihood of fraud in a bus pass application.
 * - FraudDetectionInput - The input type for the predictFraud function.
 * - FraudDetectionOutput - The return type for the predictFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  age: z.number().describe('The age of the applicant.'),
  income: z.number().describe('The income of the applicant.'),
  routePopularity: z.number().describe('The popularity of the requested bus route (1-10).'),
  priorApplications: z.number().describe('The number of prior bus pass applications by the applicant.'),
});
export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the application is predicted to be fraudulent.'),
  fraudRiskScore: z
    .number()
    .describe('A score (0-1) indicating the risk of fraud, with 1 being the highest risk.'),
  reasoning: z.string().describe('The AI’s reasoning for the fraud prediction.'),
});
export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function predictFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return predictFraudFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fraudDetectionPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an AI assistant helping to detect potentially fraudulent bus pass applications.

  Based on the applicant's characteristics, you will predict whether the application is fraudulent and provide a risk score.

  Applicant Age: {{{age}}}
  Applicant Income: {{{income}}}
  Route Popularity: {{{routePopularity}}}
  Prior Applications: {{{priorApplications}}}

  Consider these factors and provide your reasoning for the fraud prediction. Set the isFraudulent boolean field and provide a fraudRiskScore between 0 and 1.
  `,
});

const predictFraudFlow = ai.defineFlow(
  {
    name: 'predictFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
