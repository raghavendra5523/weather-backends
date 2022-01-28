import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';

import { CreatePostDTO } from 'src/weather/dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {

    constructor(private WeatherService: WeatherService) {}

    @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.WeatherService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }
    @Get('post/:postID')
  async getPost(@Res() res, @Param('postID',new ValidateObjectId()) postID) {
    const post = await this.WeatherService.getPost(postID);
    if (!post) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }
    
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.WeatherService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  
  @Put('/edit')
  async editPost(@Res() res,@Query('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.WeatherService.editPost(postID, createPostDTO);
    if (!editedPost) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }
  @Delete('/delete')
  async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
    const deletedPost = await this.WeatherService.deletePost(postID);
    if (!deletedPost) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}
