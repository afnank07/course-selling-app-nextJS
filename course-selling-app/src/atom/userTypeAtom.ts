import { recoilPersist } from 'recoil-persist'
import { atom } from 'recoil';
const { persistAtom } = recoilPersist()

export const userTypeAtom = atom({
  key: 'userTypeAtom',
  default: "",
  // effects_UNSTABLE: [persistAtom],
})

