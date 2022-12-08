# recursively-git-fetch

This is a simple app witch can:
- checkout to selected brach,
- fetch and
- pull

code for all repositories inside selected directory.

It's usefull when you ar working with many microservices at this same time. In example, with this app you can easly update all your local repositories to the selected branch.

# usage
First you should copy `.env.template` file as `.env`, and define variables as you need.

Next install dependencies, and start script
- `npm i`
- `npm start`

or if you are using yarn
- `yarn install`
- `yarn start`

## environment variables
|variable|description|example|
|-|-|-|
| TARGET_BRANCH | The branch you want to update your local repositories to. | develop |
|ROOT_DIR_ABSOLUTE_PATH | Absolute path to directory with your repositories. | /home/user/projects |
|SKIP_REPOSITORY_PATH_REGEX | Repositories whose paths match the specified expression will be skipped. | (temp)\|(tmp) |

<div style="text-align:center; margin-top:64px">
<a href="https://buycoffee.to/poohpatine" target="_blank"><img src="https://buycoffee.to/btn/buycoffeeto-btn-primary.svg" style="width: 128px" alt="Postaw mi kawę na buycoffee.to"></a>
</div>