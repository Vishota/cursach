export async function getAnnouncements() {
    let announcements = [];
    for(let i = 0; i < 13; i++) {
        announcements.push({
            title: '123',
            pic: 'https://avatars.mds.yandex.net/get-entity_search/143021/277909318/S168xU_2x',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Ultrices eros in cursus turpis massa tincidunt dui ut. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Aliquam sem fringilla ut morbi tincidunt augue. Sed sed risus pretium quam vulputate dignissim. Et malesuada fames ac turpis. Vitae purus faucibus ornare suspendisse sed nisi.',
            price: '100 BYN',
            date: '04.12.2022'
        })
    }
    return announcements;
}