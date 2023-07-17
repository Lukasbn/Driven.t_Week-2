import { ApplicationError } from '@/protocols';

export function notYourTicketError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: "The ticked are not your's",
  };
}