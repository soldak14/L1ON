import { Store } from "react-notifications-component";

export class NotificationService
{
	showInfo(message: string)
	{
		Store.addNotification({
			message: message,
			type: "success",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true,
			},
		});
	}

	showError(message: string)
	{
		Store.addNotification({
			message: message.replace("assertion failure with message: ", ""),
			type: "danger",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true,
			},
		});
	}
}