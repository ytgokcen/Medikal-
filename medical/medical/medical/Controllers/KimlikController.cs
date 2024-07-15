using medical.Models.DataContext;
using medical.Models.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace medical.Controllers
{
    public class KimlikController : Controller
    {
        MedikalWebDBContext db = new MedikalWebDBContext();
        // GET: Kimlik
        public ActionResult Index()
        {
            return View(db.Kimlik.ToList());
        }


        // GET: Kimlik/Edit/5
        public ActionResult Edit(int id)
        {
            var kimlik = db.Kimlik.Where(X => X.KimlikId == id).SingleOrDefault();
            return View(kimlik);
        }

        // POST: Kimlik/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit(int id, Kimlik kimlik, HttpPostedFileBase LogoURL)
        {
            if (ModelState.IsValid)
            {
                var k = db.Kimlik.Where(x => x.KimlikId == id).SingleOrDefault();

                if (LogoURL !=null)
                {
                    if (System.IO.File.Exists(Server.MapPath(kimlik.LogoURL)))
                    {
                        System.IO.File.Delete(Server.MapPath(kimlik.LogoURL));
                    }
                    WebImage img = new WebImage(LogoURL.InputStream);
                    FileInfo imginfo = new FileInfo(LogoURL.FileName);

                    string logoname = LogoURL.FileName + imginfo.Extension;
                    img.Resize(300, 200);
                    img.Save("~/Uploads/Kimlik/" +  logoname);

                    k.LogoURL = "/Uploads/Kimlik/" + logoname;
                }
                k.Title= kimlik.Title;
                k.Keywords= kimlik.Keywords;
                k.Description= kimlik.Description;
                k.Unvan= kimlik.Unvan;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(kimlik);    
            
        }
    }
}
