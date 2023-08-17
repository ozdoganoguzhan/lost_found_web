export interface ISubCategory {
  subCategoryId: string,
  subCategoryName: string,
  categoryId: string
}

export interface ICategory {
  categoryId: string,
  name: string,
  subCategories: Array<ISubCategory>,
  postCount: number
}

export interface IPost {
  postId: number,
  categoryId: string,
  userId: number,
  title: string,
  text: string,
  date: Date,
  imageUrl: string,
  address: string,
  city: string
}

export interface IUser {
  userId: number,
  email: string,
  password: string,
  profilePicture: string,
  username: string,
  firstName: string,
  lastName: string,
  emailVerified: boolean,
  phoneNumber: string
}
