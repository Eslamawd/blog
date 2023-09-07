import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        isProfileDeleted: false,
        usersCount: null,
        profiles: [],
        requist: [],
        frinds: [],
    },
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload
        },
        setProfilePhoto(state, action) {
            state.profile.profilePhoto = action.payload
        },
        updateProfile(state, action) {
            state.profile = action.payload
        },
        setLoading(state) {
            state.loading = true
        },
        clearLoading(state) {
            state.loading = false
        },
        setIsProfileDeleted(state) {
            state.isProfileDeleted = true
            state.loading = false
        },
        
        clearIsProfileDeleted(state) {
            state.isProfileDeleted = false
        },
        setUserCount(state, action) {
            state.usersCount = action.payload
        },
        setProfiles(state, action) {
            state.profiles = action.payload
        },
        setRequist(state, action) {
            state.requist = action.payload
        },
        setFrinds(state, action) {
            const requi = state.requist.find((c) => c.toString() === action.payload._id);
            const reqIndex = state.requist.indexOf(requi);

            state.requist.splice(reqIndex, 1);
        },
        deleteRequist(state, action) {
            const requi = state.requist.find((c) => c.toString() === action.payload._id);
            const reqIndex = state.requist.indexOf(requi);

            state.requist.splice(reqIndex, 1);
        }
        ,
        deleteFrinds(state, action) {
            state.frinds = action.payload
        },


        setRequistProfile(state, action) {
            
          state.profile.requestFrinds = action.payload.requestFrinds
        },

        setFrindsProfile(state, action) {
            state.profile.frinds = action.payload.frinds
        },


 
    }
});


const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;


export {
    profileReducer,
    profileActions
}