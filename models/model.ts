import mongoose, { Schema } from 'mongoose';

const StorySchema = new Schema(
	{
		storyAddress: String,
		storyId: Number,
		creatorAddress: String,
		storyName: String,
		storyDetails: String,
	},
	{
		timestamps: true
	}
);

const PageSchema = new Schema(
	{
		storyId: String,
		pageId: String,
		creatorAddress: String,
		pagesLink: String,
	},
	{
		timestamps: true
	}
);


const Story = mongoose.models.storys || mongoose.model('storys', StorySchema);
const Page = mongoose.models.pages || mongoose.model('pages', PageSchema);

export { Story, Page };