// @flow

export default function loadToken(): ?string {
  return localStorage.getItem('token');
}
