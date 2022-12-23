import router from '@/router';

export function search(text : string) {
    router.push('/search/' + text );
}