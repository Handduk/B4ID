import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const generateBucketList = async (
  interest: string[],
  goals: string[],
  numberOfItems: string
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a assistant that creates bucket lists. Im gonna send two lists, the first one are for interests, and the second one for lifegoals. You can come up with som examples to succeed with the lifegoals. If you only get one list, that list would be a interest list. Please generate ${numberOfItems} items by only responding with the list.`,
      },
      {
        role: "user",
        content: `${
          !goals.length
            ? `This is the interest list: ${interest}.`
            : `This is the interest list: ${interest}. And this is the life goals list: ${goals}`
        }}`,
      },
    ],
  });
  return response.choices[0].message;
};
