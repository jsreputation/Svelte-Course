import {writable} from "svelte/store";

const meetups = writable( []);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    setMeetups: (items) => {
          meetups.set(items);
    },
    addMeetup: (meetup) => {
        const newMeetup = {...meetup }
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


