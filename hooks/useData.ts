import { create } from 'zustand'

type Props = {
    latitude: any
    longitude: any
    nom: string
    sensation: number
    humidite: number
    pression: number
    temp: number
    tmax: number
    tmin: number
    force: number
    direction: number
    description: string
    icon: string

    setLatitude: (latitude: any) => void
    setLongitude: (longitude: any) => void
    setNom: (nom: string) => void
    setSensation: (sensation: number) => void
    setHumidite: (humidite: number) => void
    setPression: (pression: number) => void
    setTemp: (temp: number) => void
    setTmax: (tmax: number) => void
    setTmin: (tmin: number) => void
    setForce: (force: number) => void
    setDirection: (direction: number) => void
    setDescription: (description: string) => void
    setIcon: (icon: string) => void
}

const useData = create<Props>((set) => ({
    latitude: 0,
    longitude: 0,
    nom: '',
    sensation: 0,
    humidite: 0,
    pression: 0,
    temp: 0,
    tmax: 0,
    tmin: 0,
    force: 0,
    direction: 0,
    description: '',
    icon: '',
    setDirection: (value) => set({ direction: value }),
    setForce: (value) => set({ force: value }),
    setHumidite: (value) => set({ humidite: value }),
    setLatitude: (value) => set({ latitude: value }),
    setLongitude: (value) => set({ longitude: value }),
    setNom: (value) => set({ nom: value }),
    setPression: (value) => set({ pression: value }),
    setSensation: (value) => set({ sensation: value }),
    setTemp: (value) => set({ temp: value }),
    setTmax: (value) => set({ tmax: value }),
    setTmin: (value) => set({ tmin: value }),
    setDescription: (value) => set({ description: value }),
    setIcon: (value) => set({ icon: value })
}))

export default useData