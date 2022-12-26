import router from "@/router";

export function goAnnouncementEdit(id: number) {
    router.push('/announcements/' + id + '/edit');
}
export function goAnnouncement(id: number) {
    router.push('/announcements/' + id);
}
export function goMain() {
    router.push('/');
}
export function goNew() {
    router.push('/new');
}
export function goProfile(id: number) {
    router.push('/profiles/' + id );
}
export function goSearch(text: string) {
    router.push('/search/' + text );
}