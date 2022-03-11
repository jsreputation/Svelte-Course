import {writable} from "svelte/store";

const meetups = writable( [
    {
        id: 'm1',
        title: 'Coding Bootcamp',
        subTitle: 'Learn to code in 2 hours',
        description: 'In this meetup, we will have some experts that teach you how to code!',
        imageUrl: 'https://learnenglish.britishcouncil.org/sites/podcasts/files/RS6243_175211709-hig.jpg',
        address: '27th Nerd Road, 32523 New York',
        email: 'code@test.com',
        isFavorite: false
    },
    {
        id: 'm2',
        title: 'Swim Together',
        subTitle: 'Let\'s got for some swimming',
        description: 'we will simply swim some rounds !',
        imageUrl: 'https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/piultz6nngltq541xmju',
        address: '27th Nerd Road, 32523 New York',
        email: 'swim@test.com',
        isFavorite: false
    }
]);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetup) => {
        const newMeetup = {
           ...meetup,
           id: Math.random().toString(),
           isFavorite: false
        }
        meetups.update((meetups) => {
            return [newMeetup, ...meetups];
        });
    },
    toggleFavorite: (id) => {
        meetups.update((meetups) => {
            const updatedMeetup = {...meetups.find((m) => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = meetups.findIndex((m) => m.id === id);
            const updatedMeetups = [...meetups];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },
    updateMeetup: (id, newMeetup) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = {...items[meetupIndex], ...newMeetup};
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },
    removeMeetup: (id) => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        });
    }
}

export default customMeetupsStore;


