import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const courseIdAtom = atom({
    key: "courseIdState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const courseTitleAtom = atom({
    key: "courseTitleState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const courseDescriptionAtom = atom({
    key: "courseDescriptionState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const coursePriceAtom = atom({
    key: "coursePriceState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const courseImageLinkAtom = atom({
    key: "courseImageLinkState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const coursePublishedAtom = atom({
    key: "coursePublishedState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})
