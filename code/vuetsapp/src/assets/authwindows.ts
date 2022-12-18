import SignInWindow from '@/components/auth/SignInWindow.vue';
import SignUpWindow from '@/components/auth/SignUpWindow.vue';
import { createApp } from 'vue';

export function openSignInWindow() {
    createApp(SignInWindow).mount(document.body.appendChild(document.createElement('div')));
}
export function openSignUpWindow() {
    createApp(SignUpWindow).mount(document.body.appendChild(document.createElement('div')));
}