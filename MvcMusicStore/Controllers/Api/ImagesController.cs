using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;

namespace MvcMusicStore.Controllers.Api
{
    public class ImagesController : ApiController
    {
        private const string IMAGE_BASE_PATH = @"\Content\Images\AlbumArt\";

        private readonly Dictionary<string, string> MediaTypeExtensionMap = new Dictionary<string, string>
        {
            {"image/jpeg", "jpg"},
            {"image/png", "png"},
            {"image/gif", "gif"}
        };

        public async Task<HttpResponseMessage> Post()
        {
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.UnsupportedMediaType));
            }
            await Request.Content.LoadIntoBufferAsync();
            var task = Request.Content.ReadAsMultipartAsync();
            var result = await task;
            var contents = result.Contents;
            HttpContent httpContent = contents.First();
            string uploadedFileMediaType = httpContent.Headers.ContentType.MediaType;

            if (!MediaTypeExtensionMap.Keys.Contains(uploadedFileMediaType))
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.UnsupportedMediaType));
            }

            Stream image = httpContent.ReadAsStreamAsync().Result;

            if (image.CanRead)
            {
                var guid = Guid.NewGuid();
                string fileName = String.Format("{0}.{1}", guid.ToString(), MediaTypeExtensionMap[uploadedFileMediaType]);
                string imagePath = Path.Combine(HostingEnvironment.MapPath(IMAGE_BASE_PATH), fileName);
                using (FileStream fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
                return ControllerContext.Request.CreateResponse(HttpStatusCode.Created, Path.Combine(IMAGE_BASE_PATH, fileName).Replace('\\', '/'));
            }

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }
    }
}
