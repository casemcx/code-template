export enum MessageType {
	Text = 'text',
	Image = 'image',
	File = 'file',
	News = 'news',
}

export const WechatMessage = {
	[MessageType.Text]: (context: any) => ({
		msgtype: MessageType.Text,
		text: {
			context,
		},
	}),
	[MessageType.Image]: (images: string[]) => ({
		msgtype: MessageType.Image,
		image: {
			media_id: '',
			images: images,
		},
	}),
	[MessageType.File]: (media_id: string) => ({
		msgtype: MessageType.File,
		file: {
			media_id,
		},
	}),
};
