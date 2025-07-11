import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloneRequest = req.clone({ setHeaders: { Authorization: token } });

    return next(cloneRequest);
  }

  return next(req);
};
