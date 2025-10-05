import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

const exclude_array: string[] = ['/login', '/register', '/verifyEmail', '/send-email'];

function toExclude(url: string) {
  var length = exclude_array.length;
  for (var i = 0; i < length; i++) {
    if (url.search(exclude_array[i]) != -1)
      return true;
  }
  return false;
}
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwt = authService.getToken();
  console.log("Interceptor token :", jwt); 
  if (jwt && !toExclude(req.url)) {
    const reqWithToken = req.clone({
      setHeaders: { Authorization: jwt }
    });
    return next(reqWithToken);
  }
  return next(req);
}
