import { IEventBus, IMessage } from "../services/event-bus/event-bus.interface";


export const cleanEventMessage: IEventBus = {
  from: 'auth',
  route: 'none',
  to: 'shell',
  message: {
    isShowMenu: false,
    isShowHeader: false,
  } as IMessage,
};

export const initialEventMessage: IEventBus = {
  from: 'auth',
  route: 'none',
  to: 'shell',
  message: {
    isShowMenu: true,
    isShowHeader: true,
  } as IMessage,
};
